const express =require('express');
const storage =require('node-persist');
const cors =require('cors');

const app= express();
app.use(express.json());
app.use(cors());//enable Cross-Origin Resource Sharing

async function initializeStorage() {
  // Initialize the storage node-persist
    await storage.init();
  // Clear any existing data in the storage
    await storage.clear();
  }
  
  initializeStorage();

let task= 1;// initializing the task variable
//get method
app.get('/todo_data', async(req,res)=>{
    const data = await storage.values();
    res.json(data);

});
//post method
app.post('/todo_data', async (req, res) => {
    const data = req.body;
  
    const key = task.toString();
    task++;
    await storage.setItem(key, data);
  
    res.json({ message: 'Data added successfully' });
    console.log(data);
  });
// Start the Express server and make it listen on port 5000
app.listen(5000, ()=>{
    console.log('server is listen at port 5000')
});