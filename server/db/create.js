module.exports = (db, db_tables) => {
  new Promise((resolve, reject) => {
    console.log('-------------- Start  -------------');
    console.log('');
    resolve()
  })
    .then(stat => {
      db_tables(db, result => {
        if(result === 'end'){
          console.log('');
          console.log('-------------- Finish -------------');
          db.end();
        }
      })
    })
    .catch(err => { console.error(err) })
}