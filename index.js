import app from './express.js'
app.get("/", (req, res) => {
res.json({ message: "Welcome to DressStore application." });
});
app.listen(process.env.PORT, (err) => { 
if (err) {
console.log(err) 
}
console.info('Server started on port %s.', process.env.PORT) 
})
