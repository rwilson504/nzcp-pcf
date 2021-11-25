# NZ COVID Pass PCF Component
This PCF component utilizes [nzcp-js](https://github.com/vaxxnz/nzcp-js) to provide NZ Covid Pass Validation within a Canvas Power App. 

## Installation

 Make sure you have enabled PCF components for Canvas apps in your environment.  For instructions on that [Click Here](https://docs.microsoft.com/en-us/powerapps/developer/component-framework/component-framework-for-canvas-apps)

 Install the managed solution provided in the Release are of this repo.

## Control Properties
| Name | Mode | Type | Description | Default |
|---|---|---|---| --- |
|QR Codekd|Input| SingleLine.Text | The contents of the QR Code||
|Offline Mode|Input| Boolean | If offline mode is set to true the component will attempt to validate the COVID-19 Pass using a prefetched DID document, otherwise it will attempt to resolve the DID document from the MoH.|false|
|Test Mode|Input|Boolean|Allows you to set the control into test mode which will ensure that the sample QR code from https://nzcp.covid19.health.nz/#valid-worked-example will validate.|false|
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
