var $loginBtn = $(".login-btn")
var mark = 0;

function getUsers() {
    var $username = $(".username").val();
    var $password = $(".password").val();
    $.ajax({
        url: !mark ? "/login" : "/register",
        data: {
            username: $username,
            password: $password
        },
        method: "post",
        success: (res) => {
            console.log(res.success)
            if (res.success) {
                location.href = "http://localhost:3000/auto"
            } else {
                alert(res.error.message)

            }
        }
    })
}

$loginBtn.on("click", getUsers)

$(".register-tips").click(function() {
    if (!mark) {
        $loginBtn.text("注册");
        $(this).text("去登录吧")
    } else {
        $loginBtn.text("登录");
        $(this).text("去注册下被")
    }
    mark = !mark
})