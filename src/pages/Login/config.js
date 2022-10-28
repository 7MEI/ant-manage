module.exports={
    form:{
        username:'',
        password:''},
        rules: {
            username: [
                { required: true, message: "请输入用户名", trigger: "blur" },
                {
                    min: 3,
                    message: "用户名长度不能小于3位",
                    trigger: "blur"
                }
            ],
            password: [
                { required: true, message: "请输入密码", trigger: "blur" }
            ]
        }
    
}
 
