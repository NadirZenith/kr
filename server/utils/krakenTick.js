// import kraken from './kraken';


const tickInterval = (arg) => {
    console.log(`arg was => ${arg}`);

    // tags.update({name: 'yzf'}, {$inc: {count: 1}})

    // const pair = 'XXMRZEUR' //XXMRZEUR
    // kraken.api('Ticker', {pair: pair}, (error, success) => {
    //
    //     if(error){
    //         d('Kraken error:\n' + error)
    //         return
    //     }
    //     if(!success){
    //         d('Kraken error(null):\n' + success)
    //         return
    //     }
    //
    //     ticks.insert(success)
    //     d(success)
    //     // ticks.insert(success, {w: 1}, (err, result) => {
    //     //   if (err) {
    //     //     d('error:\n' + err)
    //     //     return
    //     //   }
    //     //   d('DB insert ok!')
    //     // })
    //
    // });

}

// setInterval(tickInterval, 1000 * 60, 'funky');

export function createTickInterval(interval, options) {
    console.log('called create tick interval');

    return setInterval(demoOutput, (interval * 1000), options);
}

let count = 0;
const demoOutput = (param) => {
    count++
    console.log('demo outpup ' + param.key  + ' ' + count);
    // console.log('demo outpup ' + (param.key | '(n/a)') + ' ' + count);
}