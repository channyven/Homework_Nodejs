export default class BaseController {
    success(res, data = null, message = 'Success') {    //Method នេះប្រើសម្រាប់បញ្ជូន Response ពេល API ដំណើរការជោគជ័យ ✅
        return res.status(200).json({
//🔹 status(200)
//HTTP Status Code 200
//មានន័យថា Request ជោគជ័យ
//🔹 .json()
//បញ្ជូន data ជា JSON format
            success: true,
            data,
            message
        });;

    }
    error(res, message = 'An error occurred', statusCode = 500) {   //Method នេះប្រើសម្រាប់បញ្ជូន Error Response ❌
        return res.status(statusCode).json({      //បញ្ជូន status code ទៅ client
            success: false,
            message
        });
    }

}