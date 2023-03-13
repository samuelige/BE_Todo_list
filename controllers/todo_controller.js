const moment = require("moment/moment");
const pool = require("../util/database");

const createTodo = async (req, res) => {
    const {todo} = req.body;

    if(!todo){
        return res.send('Check your credentials and try again')
    }

    try {
        const created_on = moment(new Date());
        await pool.query('CREATE TABLE IF NOT EXISTS "todos" ("id" SERIAL PRIMARY KEY,"todo" varchar(100), created_on DATE NOT NULL);');
        await pool.query('INSERT INTO todos(todo, created_on) values($1, $2)', [todo, created_on], (err, result) => {
            if(!err){
                return res.status(201).json({
                    message: 'User created successfully!'
                });
            }
            else { 
                return res
                .send({ success: false, message: err.message });
            }
        });
 
      } catch (error) {
        return res.status(500).json('Error on createTodo' + error);
    }
};


const getTodo = async (req, res) => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS "todos" ("id" SERIAL PRIMARY KEY,"todo" varchar(100), created_on DATE NOT NULL);');
        let queryResult;

        if(!req.params.id) {
            const request = await pool.query(`SELECT * from todos`);
            queryResult = request.rows;
        } else {
            const request = await pool.query(`SELECT * from todos WHERE id = $1`, [req.params.id]);
            queryResult = request.rows;
        }

        return res.status(200).json(queryResult);
    } catch (error) {
        return res.status(500).json('Error on getTodo' + error)
    }
};

const updateTodo = async (req, res) => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS "todos" ("id" SERIAL PRIMARY KEY,"todo" varchar(100), created_on DATE NOT NULL);');
        await pool.query(`UPDATE todos SET todo = $1 WHERE id = $2`, [req.body.todo, req.params.id]);

        return res.status(200).json('Updated a todo successfully');
    } catch (error) {
        return res.status(500).json('Error on updateTodo' + error)
    }
};

const deleteTodo = async (req, res) => {
    try {
        await pool.query('CREATE TABLE IF NOT EXISTS "todos" ("id" SERIAL PRIMARY KEY,"todo" varchar(100), created_on DATE NOT NULL);');
        await pool.query('DELETE from todos WHERE id = $1', [req.params.id]);

        return res.status(200).json(`Deleted successfully`);
    } catch (error) {
        return res.status(500).json('Error on deleteTodo' + error)
    }
};

module.exports = {createTodo, getTodo, updateTodo, deleteTodo}