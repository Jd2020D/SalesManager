const Info = {
    firstName: {
        type: String,
        validate:{
            validator: val=> (/^[a-zA-Z\-]+$/).test(val),
            message:"Please enter valid last name"
        },
        required: [true, "First name is required"]
      },
      lastName: {
        type: String,
        validate:{
            validator: val=> (/^[a-zA-Z\-]+$/).test(val),
            message:"Please enter valid last name"
        }
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        validate: [
            { 
                validator:  val =>(/^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val)) ,
                message: "Please enter a valid email" 
            },
            { 
                validator:  async function (val){
                    // dont check the exist of email if the schema hadnt role property(is a customer)
                    if(Boolean(!this.Role))
                        return true;
                    return await this.constructor.findOne({email:val})
                    .then(res=>{
                        if(res===null)
                            return true;
                        return false;
                    })
                    .catch(err=>false);

                } ,
                message: "This email is exist" 
            },
        ]
      },
      phone: {
        type: String,
        validate: {
            validator: val=> {
              return /\d{3}-\d{3}-\d{4}/.test(val);
            },
            message: props => `${props.value} is not a valid phone number!`      
      }}

  
  
};

module.exports.Info=Info;