export const postData = (url) => async (data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const postedData = await response.json();
    return response;
  } catch (error) {
    console.error("Failed to post data:", error);
  }
};
