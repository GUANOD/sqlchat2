interface Data {
  username: string;
  password: string;
}

export const post = (post: Data, address: string) => {
  return new Promise((resolve, reject) => {
    fetch(address, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8080",
      },
      body: JSON.stringify({
        username: post.username,
        password: post.password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          reject(data);
          return;
        }
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};
