// Generic api request wrapper
function apiRequest(url, params = {}, data = false) {
  // Pass cookies and the CSRF token by default
  const defaultParams = {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': document.querySelector('[name=csrf-token]').content
    }
  }

  // Build the params
  params = {...defaultParams, ...params};

  // Add a body
  if(data) {
    params.body = JSON.stringify(data)
  }

  return fetch(
    url,
    params
  ).then(response => {
    return response.json();
  }).catch(error => {
    console.log(error);
  });
}

// Available API routes
export default {
  trips: {
    index: () => {
      return apiRequest('/api/trips');
    },
    create: (data) => {
      return apiRequest('/api/trips', {
        method: 'post'
      }, data);
    },
    show: (id) => {
      return apiRequest(`/api/trips/${id}`)
    },
    showExclusionDates: (id) => {
      return apiRequest(`/api/trips/${id}/trip_exclusion_dates`)
    },
    updateExclusionDates: (id, data) => {
      return apiRequest(`/api/trips/${id}/trip_exclusion_dates`, {
        method: 'post'
      }, data);
    },
    showTripSchedules: (id) => {
      return apiRequest(`/api/trips/${id}/trip_schedules`)
    }
  }
}