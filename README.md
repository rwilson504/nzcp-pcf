# NZ COVID Pass PCF Component
<span style="color:red">**If you are having issues with the control not working within Android or iOS make sure to set the Offline Mode for the component to true.  This will utilize a cached copy of the DID Issuer instead of attempting to retrive it from the web.**</span>

This PCF component utilizes [nzcp-js](https://github.com/vaxxnz/nzcp-js) to provide NZ Covid Pass Validation within a Canvas Power App. 

<img width="521" alt="image" src="https://user-images.githubusercontent.com/7444929/143484767-3bd05296-bae9-4e4a-8712-6bca273dd160.png">

## Installation

### Prerequisite
Make sure you have enabled PCF components for Canvas apps in your environment.  For instructions on that [Click Here](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/component-framework-for-canvas-apps)

### Import PCF Component Solution
- Download the managed solution provided in the Release are of this repo. [NZCOVIDPass_managed.zip](https://github.com/rwilson504/nzcp-pcf/releases/latest/download/NZCOVIDPass_managed.zip)
- Navigate to https://make.powerapps.com
- Click on Solution area
- Click **Import** button on the ribbon and select the NZCOVIDPass_managed.zip file you downloaded.
- Followow the import wizard and wait for solution to import. 

![CovidPassSolution](https://user-images.githubusercontent.com/7444929/143589749-8e213445-170a-46ec-b6cb-d9674d4524fb.gif)

### Import Sample App
- Download the sample app file [NZ COVID Pass Scanner.msapp](https://github.com/rwilson504/nzcp-pcf/raw/master/Sample/NZ%20COVID%20Pass%20Scanner.msapp)
- Navigate to https://create.powerapps.com
- Click on Open from menu
- In the Open menu select **Browse** and choose the NZ COVID Pass Scanner.msapp file you downloaded
- Click the **Open app** button on the "This app may contian unsafe code" dialog.
- If an "Update code components" dialog appears click the **Update** button.
- The app will now open Power Apps Canvas Studio.
- Choose **File** from the ribbon and save the app to your environment.

![InstallSampleApp](https://user-images.githubusercontent.com/7444929/143590905-80e1d233-b0b7-4144-9034-3c10aa1538a7.gif)

## Control Properties
| Name | Mode | Type | Description | Default |
|---|---|---|---| --- |
|QR Codekd|Input| SingleLine.Text | The contents of the QR Code||
|Offline Mode|Input| Boolean | If offline mode is set to true the component will attempt to validate the COVID-19 Pass using a prefetched DID document, otherwise it will attempt to resolve the DID document from the MoH. **Recently changed this to true as default due to CORS restrictions on the nzcp site for obtaining the trusted issuer.**|true|
|Test Mode|Input|Boolean|Allows you to set the control into test mode which will ensure that the sample QR code from https://nzcp.covid19.health.nz/#valid-worked-example will validate.|false|
|Trusted Issuer|Input|SingleLine.Text|Can be used when control is in offline mode to supply trusted issuer id.  DID Document property must also be set in this scenario.||
|DID Document|Input|SingleLine.Text|Can be used when control is in offline mode to supply static DID document JSON. Trusted Issue property must also be set in this scenario.||
|Success|Output|Boolean|Provides the outcome of the COVID Pass validation|false|
|Family Name|Output|SingleLine.Text|Pass holders family name||
|Given Name|Output|SingleLine.Text|Pass holders given name||
|Date of Birth|Output|SingleLine.Text|Pass holders date of birth||
|Violation Message|Output|SingleLine.Text|Friendly Error Message||
|Violation Section|Output|SingleLine.Text|Section of official specs under violation||
|Violation Link|Output|SingleLine.Text|Link to specifications breached||
|Violation Description|Output|SingleLine.Text|Simplified error message||

## Sample App
A sample app is included under the Sample folder of this project which you can import into your environment once you have deployed the PCF solution.
