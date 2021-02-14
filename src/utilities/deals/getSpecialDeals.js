export default function getSpecialDeals(setFeaturedDeal, setPopularDeals, serverOrigin){
    return new Promise((resolve, reject) => {
        fetch(`${serverOrigin}/deals/special`)
        .then(data => {
            return data.json();
        })
        .then(specialDeals => {
            console.log('specialDeals below');
            console.log(specialDeals);
            setFeaturedDeal(specialDeals.sDeal.featured);
            setPopularDeals(specialDeals.sDeal.popular);
            resolve(specialDeals);
        })
        .catch(err => {
            console.error(`Something went wrong in get special deals fetch functions because ${err.message}`);
            reject(err);
        });
    });
}