export default function GetFreshDeals(setFreshDeals){
    return new Promise((resolve, reject) => {
        fetch('https://www.cheapshark.com/api/1.0/deals', {
        method: 'get'
        })
        .then((res) => {
            return res.json();
        })
        .then((deals) => {
            setFreshDeals(deals);
            resolve(deals);
        })
        .catch(err => {
            console.error('error happeoned in get fresh deals fetch because ' + err.message);
            reject(err);
        });
    });
};