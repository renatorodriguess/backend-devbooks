const {v4: uuid} = require("uuid");
const User = require("../models/User");

module.exports = {
   async index(request, response){
        try{
            const users = await User.find();
            return response.status(200).json(users)
        }catch{
            response.status(500).json({ error: err.message })
        }
    },

    async store(request, response) {
        const {name, email, state, city} = request.body;

        if( !name || !email || !state || !city){
            return response.status(400).json({error: "Missing title or link"})
        }

        const user = new User({
            _id: uuid(),
            name,
            email,
            state,
            city
        })

        try {
            await user.save();
            return response.status(201).json({ message: "User added successfully" })
        }catch(err) {
            response.status(400).json({ error: err.message })
        }
    },

    async update(request, response) {
        const {name, email, state, city} = request.body;

        if(!name && !email && !state && !city) {
            return response.status(400)
            .json({ error: "You must inform a new name, email, state or city" })
        }

        if (name) response.user.name = name;
        if (email) response.user.email = email;
        if (state) response.user.state = state;
        if (city) response.user.city = city;

        try {
            await response.user.save();
            return response.status(200).json({ message: "User updated successfully" })
        } catch (err){
            response.status(500).json({ error: err.message })
        }
    },

    async delete(request, response) {
        try {
            const user = response.user; // Obtenha o usuário do response
    
            // Use o método deleteOne() do Mongoose para excluir o usuário
            await User.deleteOne({ _id: user._id });
    
            return response.status(200).json({ message: "User deleted successfully" });
        } catch (err) {
            return response.status(500).json({ error: err.message });
        }
    } 
};

