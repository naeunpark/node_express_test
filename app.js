import express from 'express';
import mysql from 'mysql'
import bodyParser from 'body-parser'

const app = express();
const router = express.Router();

const connection = mysql.createConnection({
    host :'localhost', //db ip address
    port : 3306, //db port number
    user : 'root', //db id
    password : '', //db password
    database:'tasman' //db schema name
});

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }else{
        console.log("연결에 성공하였습니다.");
    }
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/public/view');
app.engine('html', require('ejs').renderFile);

app.use(express.static(__dirname + 'public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true})); //한글 그대로 인식함
// //use: express의 함수, 미들웨어 연결하는 것


app.get('/index', (req, res) => {
	// const query = connection.query('SELECT * FROM users', (err, rows) => {
	// 	if(err) throw err;
	// 	const users = rows.length !== 0 ? rows : {message:'No data selected'}
	// 	res.json(users);
  res.render('index.html');
	});

app.listen(3000, () => {console.log('Example app listening on port 3000')});
