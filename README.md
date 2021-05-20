# API-Generator Hook Library

This is a library with generator hooks that are used in more than one template. Use these hooks to not double your work.

This library consists of the following hooks:
| Hook name | Hook type | Description |
| -------------------- | ----------------- | ----------------------------------------------------------------------------------------------------- |
| `replaceOwnDeviceId` | `generate:before` | Replaces all parameters `ownDeviceId` with the value given with the template parameter `ownDeviceId`. |

## Using this hook library in custom templates

1. Add `@escapeengineers/asyncapi-generator-hooks` to `dependencies` of your template
   ```bash
   yarn add -D @escapeengineers/asyncapi-generator-hooks
   ```
2. Configure your template what hooks you want to use in the template configuration file:
   ```json
   {
     "hooks": {
       "@escapeengineers/asyncapi-generator-hooks": "replaceOwnDeviceId"
     }
   }
   ```
3. (Optional) In case the hook that you want to use supports parameters, specify in the configuration what parameters users can specify:
   ```json
   {
     "parameters": {
       "ownDeviceId": {
         "description": "Specify the device id which should be inserted into the channel/topic names. Required if more than one device id is allowed.",
         "required": false
       }
     },
     "hooks": {
       "@escapeengineers/asyncapi-generator-hooks": "replaceOwnDeviceId"
     }
   }
   ```
