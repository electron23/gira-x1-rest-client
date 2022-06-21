const https = require('https');
const axios = require('axios');

const urlPrefix = 'https://';
const urlSuffix = '/api/v2';

axios.defaults.httpsAgent = new https.Agent({
  rejectUnauthorized: false,
  cert: null,
  key: null,
  passphrase: '',
});

const GiraX1RestClient = {
  register: async (config) => {
    if (!config || !config.address || !config.username || !config.password)
      throw new Error('No parameter passed');

    const url = `${urlPrefix}${config.address}${urlSuffix}/clients`;

    const requestOptions = {
      auth: {
        username: config.username,
        password: config.password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    return await axios.post(
      url,
      { client: 'gira-x1-rest-client' },
      requestOptions
    );
  },

  unregister: async (config) => {
    if (!config || !config.address || !config.token)
      throw new Error('No parameter passed');

    const url = `${urlPrefix}${config.address}${urlSuffix}/clients/${config.token}`;

    const requestOptions = {};

    return await axios.delete(url, {}, requestOptions);
  },

  getServerInfo: async (config) => {
    if (!config || !config.address || !config.token)
      throw new Error('No parameter passed');

    const url = `${urlPrefix}${config.address}${urlSuffix}`;

    const requestOptions = {
      parameter: {
        token: config.token,
      },
    };

    return await axios.get(url, {}, requestOptions);
  },

  registerCallbacks: async (config, body) => {
    if (!config || !config.address || !config.token || !body)
      throw new Error('No parameter passed');

    const url = `${urlPrefix}${config.address}${urlSuffix}/clients/${config.token}/callbacks`;

    const requestOptions = {};

    return await axios.post(url, body, requestOptions);
  },

  unregisterCallbacks: async (config) => {
    if (!config || !config.address || !config.token)
      throw new Error('No parameter passed');

    const url = `${urlPrefix}${config.address}${urlSuffix}/clients/${config.token}/callbacks`;

    const requestOptions = {};

    return await axios.delete(url, requestOptions);
  },

  getUiConfig: async (config) => {
    if (!config || !config.address || !config.token)
      throw new Error('No parameter passed');

    const url = `${urlPrefix}${config.address}${urlSuffix}/uiconfig`;

    const requestOptions = {
      parameter: {
        token: config.token,
        expand: 'dataPointFlags,parameters,locations,trades',
      },
    };

    return await axios.get(url, requestOptions);
  },

  getUiConfigUi: async (config) => {
    if (!config || !config.address || !config.token)
      throw new Error('No parameter passed');

    const url = `${urlPrefix}${config.address}${urlSuffix}/uiconfig/uid`;

    const requestOptions = {
      parameter: {
        token: config.token,
      },
    };

    return await axios.get(url, requestOptions);
  },

  getValueForUid: async (config, uid) => {
    if (!config || !config.address || !config.token || !uid)
      throw new Error('No parameter passed');

    const url = `${urlPrefix}${config.address}${urlSuffix}/values/${uid}`;

    const requestOptions = {
      parameter: {
        token: config.token,
      },
    };

    return await axios.get(url, requestOptions);
  },

  setValues: async (config, body) => {
    if (!config || !config.address || !config.token || !body)
      throw new Error('No parameter passed');

    const url = `${urlPrefix}${config.address}${urlSuffix}/values`;

    const requestOptions = {
      parameter: {
        token: config.token,
      },
    };

    return await axios.put(url, body, requestOptions);
  },

  setValueForUid: async (config, uid, value) => {
    if (!config || !config.address || !config.token || !uid || !value)
      throw new Error('No parameter passed');

    const url = `${urlPrefix}${config.address}${urlSuffix}/values`;

    const requestOptions = {
      parameter: {
        token: config.token,
      },
    };

    const body = {
      values: [{ uid: uid, value: value }],
    };
    return await axios.put(url, body, requestOptions);
  },

  getLicences: async (config) => {
    if (!config || !config.address || !config.token)
      throw new Error('No parameter passed');

    const url = `${urlPrefix}${config.address}${urlSuffix}/licenses`;
    const requestOptions = {
      parameter: {
        token: config.token,
        refresh: true,
      },
    };

    return await axios.get(url, requestOptions);
  },
};

module.exports = GiraX1RestClient;
