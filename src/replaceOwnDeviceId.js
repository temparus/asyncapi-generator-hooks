const xDeviceIds = 'x-deviceIds';

/**
 * API Generator hook for replacing "{ownDeviceId}" in channel names with the actial device id.
 *
 * This hook requires the template paramter "ownDeviceId" configured at the template!
 */
function replaceOwnDeviceId(generator) {
  console.log("Called replaceOwnDeviceId hook!");

  let ownDeviceId = generator.templateParams.ownDeviceId;
  // Accesses the internal state of the asyncapi document. This might break anytime!
  const originalChannels = generator.asyncapi._json.channels;
  const allowedDeviceIds = generator.asyncapi._json[xDeviceIds];

  if (!allowedDeviceIds) {
    throw new Error(
      `asyncapi.yml does not specify "${xDeviceIds}". Cannot apply hook "replaceOwnDeviceId".`
    );
  }

  if (!ownDeviceId && allowedDeviceIds.length === 1) {
    ownDeviceId = allowedDeviceIds[0];
  } else if (!ownDeviceId || !allowedDeviceIds.includes(ownDeviceId)) {
    throw new Error(
      `Template parameter "ownDeviceId" must be set to one of: ${allowedDeviceIds.join(
        ', '
      )}`
    );
  }

  console.log(`ownDeviceId: ${ownDeviceId}`);

  generator.asyncapi._json.channels = Object.keys(originalChannels).reduce(
    (result, key) => {
      if (key.includes('{ownDeviceId}')) {
        const originalChannel = originalChannels[key];
        const newKey = key.replace(/{ownDeviceId}/g, ownDeviceId);
        const newParameters = {};

        Object.keys(originalChannel.parameters).forEach(key => {
          if (key !== 'ownDeviceId') {
            newParameters[key] = originalChannel.parameters[key];
          }
        });

        const newChannel = {
          ...originalChannel,
          parameters:
            (Object.keys(newParameters).length > 0 && newParameters) ||
            undefined,
        };

        console.log('original channel');
        console.log(originalChannel);
        console.log('new channel');
        console.log(newChannel);

        result[newKey] = newChannel;
      } else {
        result[key] = originalChannels[key];
      }
      return result;
    },
    {}
  );

  console.log('result');
  console.log(generator.asyncapi.channels());
}

module.exports = replaceOwnDeviceId;
