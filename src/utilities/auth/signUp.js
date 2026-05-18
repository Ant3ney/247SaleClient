export default function SignUp(name, email, password, setUser, serverOrigin){
    return new Promise((resolve, reject) => {
        let body = JSON.stringify({
            name: name,
            email: email,
            password: password
          });
        fetch(serverOrigin + '/signup', {
          method: 'post',
          credentials: 'include',
          headers: {'Content-Type': 'application/json'},
          body: body
        })
        .then((res) => {
          return res.json();
        })
        .then(user => {
          setUser(user);
          resolve(user);
        })
        .catch((err) => {
          console.error('Something went worng in client sign up fetch because ' + err.message);
          reject({
              message: 'Something went worng in client sign up fetch because ' + err.message
          })
        });
    });
}