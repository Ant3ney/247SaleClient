export default function SignIn(email, password, setUser, serverOrigin){
    return new Promise((resolve, reject) => {
        let body = JSON.stringify({
            email: email,
            password: password
          });
          console.log('here');
          fetch(serverOrigin + '/login', {
            method: 'post',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: body
          })
          .then(res => {
            return res.json();
          })
          .then(profileInfo => {
            console.log('logg in fetch was succesfully done');
            if(profileInfo.loggedIn){
                setUser(profileInfo.user);
                resolve(profileInfo.user);
            }
            else{
                reject({
                    message: 'User not logged in with API'
                })
            }
          })
          .catch(err => {
            console.error('Something went wrong in the sign in fetch api reqest because ' + err.message);
          });
    });
}