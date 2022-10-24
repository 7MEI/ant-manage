module.exports = {
    columns :[
        {
          dataIndex: "name",
          title: "姓名",
          key: "name",
          align: 'center',
        },
      
        {
          title: "年龄",
          dataIndex: "age",
          key: "age",
          align: 'center',
        },
        {
            title: "性别",
            key: "sex",
            dataIndex: "sex ",
            scopedSlots: { customRender: 'sex' },
            align: 'center',
          },
          {
            title: "出生日期",
            dataIndex: "birth",
            key: "birth",
            align: 'center',
          },
        {
          title: "地址",
          dataIndex: "addr",
          key: "addr",
          align: 'center',
        },
       
        {
          title: "操作",
          key: "action",
          scopedSlots: { customRender: "action" },
          align: 'center',
        },
      ],
      formInline: {
        name: "",
        // sex: "",
      },
      drawerForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      }
}