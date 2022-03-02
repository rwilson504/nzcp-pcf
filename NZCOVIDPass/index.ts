import { IInputs, IOutputs } from './generated/ManifestTypes'
// import * as nzcp from '@vaxxnz/nzcp'
import { verifyPassURIOffline, VerificationResult, TRUSTED_ISSUERS, DID_DOCUMENTS } from '@vaxxnz/nzcp'

export class NZCOVIDPass implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _nzcpResult: VerificationResult;
    private _notifyOutputChanged: () => void;

    // TODO is the "useless" construtor needed?
    // eslint-disable-next-line no-useless-constructor
    constructor () {
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
     */
    public init (context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void {
      this._notifyOutputChanged = notifyOutputChanged
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     */
    public async updateView(context: ComponentFramework.Context<IInputs>): Promise<void> {
      const useCustomDid = (typeof context.parameters.trustedIssuer.raw === 'string' && context.parameters.trustedIssuer.raw.length > 0 && typeof context.parameters.didDocument.raw === 'string' && context.parameters.didDocument.raw.length > 0)

      const options = context.parameters.testMode.raw
        ? {
            trustedIssuer: TRUSTED_ISSUERS.MOH_EXAMPLE,
            didDocument: DID_DOCUMENTS.MOH_EXAMPLE
          }
        : (useCustomDid
            ? {
                trustedIssuer: context.parameters.trustedIssuer.raw as string,
                didDocument: JSON.parse(context.parameters.didDocument.raw as string)
              }
            : {}
          )

      console.log(`NZCOVIDPass.updateView testMode=${context.parameters.testMode.raw} useCustomDid=${useCustomDid}`, { context: { ...context }, options: { ...options } })

      this._nzcpResult = verifyPassURIOffline(context.parameters.QRCode.raw || '', options)

      this._notifyOutputChanged()
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs (): IOutputs {
      return {
        success: this._nzcpResult.success || false,
        familyName: this._nzcpResult.credentialSubject?.familyName || '',
        givenName: this._nzcpResult.credentialSubject?.givenName || '',
        dob: this._nzcpResult.credentialSubject?.dob || '',
        violationMessage: this._nzcpResult.violates?.message || '',
        violationSection: this._nzcpResult.violates?.section || '',
        violationLink: this._nzcpResult.violates?.link || '',
        violationDescription: this._nzcpResult.violates?.description || ''
      }
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy (): void {
      // Add code to cleanup control if necessary
    }
}
