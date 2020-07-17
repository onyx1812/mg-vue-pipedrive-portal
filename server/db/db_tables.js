module.exports = (db, callback) => {

	const tables = [
		{
			name: 'users',
			sql: 'ID INT AUTO_INCREMENT, PRIMARY KEY(ID), password VARCHAR(255), name VARCHAR(255), email VARCHAR(100), phone VARCHAR(20), country VARCHAR(255), city VARCHAR(255), address VARCHAR(255), owner_id VARCHAR(255), registered DATETIME DEFAULT NOW(), UNIQUE KEY unique_email (email)'
		}
	]

	let i = 0;
	tables.forEach(table => {
		let sql = `SELECT 1 FROM ${table.name} LIMIT 1`;
		db.query(sql, (err, result) => {
			if(result){
				console.log(`Tabsle "${table.name}" exist!`);
				i++
				if(tables.length === i){
					if(callback) callback('end');
				}
			} else{
				sql = `CREATE TABLE ${table.name}(${table.sql})`
				db.query(sql, (err, result) => {
					if(err) throw err
					i++
					console.log(`Table "${table.name}" created!`);
					const date = new Date();
					if(table.name == 'users'){
						let user = {
							password: '9J8iak45@',
							name: 'Max Globa',
							email: 'onyx18121990@gmail.com',
							phone: '+380731817768',
							country: 'UA',
							city: 'Mykolaiv',
							address: '38A Lazurna, 64 apt.',
							owner_id: 1,
							registered: date
						};
						sql = 'INSERT INTO users SET ?';
						db.query(sql, user, (err, result) => {
							if(err) throw err
							console.log('User added')
							console.log('    user: onyx1812')
							console.log('    pass: 9J8iak45@')
						});
					}
				})
			}
		})
	})
}