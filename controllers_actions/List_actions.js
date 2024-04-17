const Job = require('../modules/Jobs_module.js')
const asyncWrapper = require('../middleware/asyncWrapper.js')
const appError = require('../helpers/appError.js')

let getList = asyncWrapper(async(req,res,next)=>{

    let userID = req.userID

    let jobs = await Job.find({userID},{__v:false});

    res.status(200).json({success: true , status:"success", message: "the operation was a success" ,data:{ jobs }})
})

let greateJob = asyncWrapper(async(req,res,next)=>{

    let userID = req.userID

       let  newJob = new Job({
        name: req.body.name,
        description: req.body.description,
        userID
        })

    await newJob.save();

    res.status(201).json({success: true , status:"success",message: "job created successfully" ,data:{newJob}})

})

let deleteJob = asyncWrapper(async(req,res,next)=>{

    let userID = req.userID

    let data = await Job.deleteOne({_id: req.params.id,userID})

        if(!data.deletedCount){
            let error = new appError("not found ID",404,"fail");
           return next(error)
        }
        
        res.status(200).json({success: true ,status:"success",message: "job deleted successfully" ,data})
})

let updateJob = asyncWrapper(async(req,res,next)=>{

        let userID = req.userID

        const filter = {_id: req.params.id,userID}
        const update = req.body

        let oldJob = await Job.findOneAndUpdate(filter, update);

        if(!oldJob){
            let error = new appError("not found ID",404,"fail");
            return next(error)
        }

        res.status(200).json({success: true , status:"success",message: "job updated successfully",data: oldJob})
    }
)


module.exports = {getList,greateJob,deleteJob,updateJob}