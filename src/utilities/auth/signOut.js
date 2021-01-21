export default function(setUser, serverOrigin){
    return new Promise((resolve, reject) => {
        fetch(serverOrigin + '/logout', {
            method: 'get',
            credentials:'include'
          })
          .then(() => {
            setUser(null);
            resolve();
          })
          .catch(err => {
            console.error('Something went wrong in logout fetch');
            console.error(err.message);
            reject(err);
          });
    });
}