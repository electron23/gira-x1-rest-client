const GiraX1RestClient = require('./lib/gira-x1-rest-client');

(async () => {
  try {
    // register client
    let response = await GiraX1RestClient.register({
      address: '192.168.33.33',
      username: 'username',
      password: 'test',
    });

    if (response.status != 201) throw new Error('Error while authenticating');

    const token = response.data.token;

    // Get Licences
    response = await GiraX1RestClient.getLicences({
      address: '192.168.33.33',
      token: token,
    });

    if (response.status != 200) throw new Error('Error while getting licences');
    const licences = response.data;

    // get uiConfigUid
    response = await GiraX1RestClient.getUiConfigUi({
      address: '192.168.33.33',
      token: token,
    });

    if (response.status != 200)
      throw new Error('Error while getting UI configuration UID');
    const uiConfigUid = response.data.uid;

    // get uiConfig
    response = await GiraX1RestClient.getUiConfig({
      address: '192.168.33.33',
      token: token,
    });

    if (response.status != 200)
      throw new Error('Error while getting UI configuration');

    const location = response.data.locations;
    const functions = response.data.functions;
    const trades = response.data.trades;

    if (response.status != 200)
      throw new Error('Error while getting UI configuration');

    // get value for uid a01h (Büro Licht)
    response = await GiraX1RestClient.getValueForUid(
      {
        address: '192.168.33.33',
        token: token,
      },
      'a01h'
    );

    if (response.status != 200)
      throw new Error('Error while getting UI configuration');

    console.log(JSON.stringify(response.data.values));
  } catch (error) {
    console.log(error.message);
  }
})();
