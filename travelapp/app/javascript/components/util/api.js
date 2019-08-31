import React from 'react';

function apiRequest(url, params = {}, data = false) {
  const defaultParams = {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('[name=csrf-token]').content
    }
  }
  params = {...defaultParams, ...params};
  if(data) {
    params.body = JSON.stringify(data)
  }

  console.log(params);

  return fetch(
    url,
    params
  ).then(response => {
    return response.json();
  }).catch(error => {
    console.log(error);
  });
}

export default {
  trips: {
    index: () => { return apiRequest('/api/trips'); },
    create: (data) => {
      return apiRequest('/api/trips', {
        method: 'post'
      }, data);
    }
  }
}