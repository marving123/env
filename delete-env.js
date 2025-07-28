// scripts/delete-env.js

/**
 * Deletes a specified environment using Jelastic API.
 * 
 * Parameters:
 * - envToDelete: the name of the environment you want to delete (string)
 * - session: Jelastic API session token, injected automatically
 * 
 * Returns an object with result and message/error fields.
 */

function deleteEnvByName(envToDelete, session) {
  if (!envToDelete) {
    return { result: 1, error: "No environment name specified for deletion." };
  }

  if (!session) {
    return { result: 1, error: "No session token available." };
  }

  // Call DeleteEnv with 3 params: envName, session, password confirmation string (env name)
  var delResp = jelastic.environment.control.DeleteEnv(envToDelete, session, envToDelete);

  if (delResp.result !== 0) {
    return {
      result: delResp.result,
      error: "Failed to delete environment '" + envToDelete + "': " + (delResp.error || "Unknown error")
    };
  }

  // Optionally, wait or poll for environment deletion confirmation here if needed.

  return {
    result: 0,
    message: "Environment '" + envToDelete + "' deleted successfully"
  };
}

// Call the function with the environment name passed from addon settings.
// Replace "${settings.envToDelete}" with your actual parameter key if different.
return deleteEnvByName("${settings.envToDelete}", session);
