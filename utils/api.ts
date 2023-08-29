const createURL = (path) => {
  return window.location.origin + path;
};

export const updateEntry = async (id, content) => {
  try {
    const res = await fetch(
      new Request(createURL(`/api/journal/${id}`), {
        method: 'PATCH',
        body: JSON.stringify({ content }),
      })
    );

    if (res.ok) {
      const data = await res.json();
      return data.data;
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const createNewEntry = async () => {
  try {
    const res = await fetch(
      new Request(createURL('/api/journal'), {
        method: 'POST',
      })
    );

    if (res.ok) {
      const data = await res.json();
      return data.data;
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const askQuestion = async (question) => {
  try {
    const res = await fetch(
      new Request(createURL('/api/question'), {
        method: 'POST',
        body: JSON.stringify({ question }),
      })
    );

    if (res.ok) {
      const data = await res.json();
      return data.data;
    } else {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};
