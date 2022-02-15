$(function() {
    ///// Eメールの送信処理
    $.validator.setDefaults({
        submitHandler: function() {
            $('form').on("submit", function() {
                $('#button').text('送信中です');
                var data = $('form').serializeArray();
                data = parseJson(data);

                $.ajax({
                        url: 'https://64u21ukvpi.execute-api.ap-northeast-1.amazonaws.com/v1/send',
                        type: 'post',
                        dataType: 'json',
                        contentType: 'application/json',
                        scriptCharset: 'utf-8',
                        data: JSON.stringify(data)
                    })
                    .then(
                        function(data) {
                            ///// 送信成功時の処理
                            alert('送信に成功しました');
                            location.reload();
                        },
                        function(data) {
                            ///// 送信失敗時の処理
                            alert('送信に失敗しました');
                            location.reload();
                        });
            })
            var parseJson = function(data) {
                var returnJson = {};
                for (idx = 0; idx < data.length; idx++) {
                    returnJson[data[idx].name] = data[idx].value
                }
                return returnJson;
            }

        }
    });
    ///// フォームの入力チェック
    $("#contact_form").validate({
        errorElement: "span",
        errorClass: "alert",
        rules: {
            'subject': {
                required: true,
                maxlength: 50
            },
            'email': {
                required: true,
                email: true
            },
            'body': {
                required: true
            }
        },
        messages: {
            'subject': {
                required: "表題を入力してください",
                maxlength: "表題は50文字以内にしてください"
            },
            'email': {
                required: "メールアドレスを入力してください",
                email: "有効なメールアドレスを入力してください"
            },
            'body': {
                required: "本文を入力してください"
            }
        }
    });
});