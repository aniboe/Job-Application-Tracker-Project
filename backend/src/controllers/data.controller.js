import { asyncHandler } from "../utility/asyncHandler.js"
import { ApiError } from "../utility/ApiError.js"
import { Data } from "../models/data.model.js"
import { ApiResponce } from "../utility/ApiResponse.js"
import { APPLICATION_STATUS } from "../constants/statusOptions.js"

// create data controller

const addData = asyncHandler(
    async (req, res) => {
        // console.log("thisis a test",req.body);
        
        const {companyName, role, location, salaryRange, companyLink, status} = req.body

        // console.log("what data am i recieving",req.body);
        

        const user = req.userData?._id
        if(!user){
            throw new ApiError(400, "could not find user")
        }

        // checkif all fields are available 
        if(
            [companyName, role, location, salaryRange, companyLink, status].some((val) => !val || val.trim() === "")
        ){
            throw new ApiError(400, "all fields are required")
        }

        // we dont have to check if similar value exists
        // so we just add this into data base

        const addedData = await Data.create(
            {
                user: user,
                companyName,
                role,
                location,
                salaryRange,
                companyLink,
                status
            }
        )
        
        if(!addedData){
            throw new ApiError(400, "there was some errer while making application")
        }
        

        res
        .status(200)
        .json(new ApiResponce(
                200,
                addedData,
                "applicatio has been created successfully "
            )
        )
    }
)

// this controller will be uses until i make a better controller 
const readAll = asyncHandler(
    async (req, res) => {
        const user = req.userData?._id
        if(!user){
            throw new ApiError(400, "cuould not find user")
        }
        // fetch whatever data is in the 

        const allAplication = await Data.find({user : user})

        if(!allAplication){
            throw new ApiError(400, "there are no applications")
        }

        res
        .status(200)
        .json( new ApiResponce(
            200,
            allAplication,
            "data recieved successfully"
        ))
    }
)

const updateApplication = asyncHandler(
    async (req, res) => {
        const {companyName, role, location, salaryRange, companyLink, status} = req.body
        const { id } = req.params


        const updatedApplication = await Data.findByIdAndUpdate(
            {_id: id},
            {
                companyName,
                role,
                location,
                salaryRange,
                companyLink,
                status
            },
            {returnDocument: "after"}
        )
        

        if(!updatedApplication){
            throw new ApiError(400, " could not finta this applicaion")
        }
        
        
        res
        .status(200)
        .json( new ApiResponce(
            200,
            updatedApplication,
            "aplication updated successfully"
        ))
        
    }
)

const updateApplicationStatus= asyncHandler( //  update this
    async (req, res) => {
        const {status} = req.body
        const { id } = req.params


        const updatedApplication = await Data.findByIdAndUpdate(
            {_id: id},
            {
                status
            },
            {returnDocument: "after"}
        )
        

        if(!updatedApplication){
            throw new ApiError(400, " could not finta this applicaion")
        }
        
        
        res
        .status(200)
        .json( new ApiResponce(
            200,
            {},
            "status updated successfully"
        ))
        
    }
)

const deleteApplication = asyncHandler(
    async (req, res) => {
        const { id } = req.params

        /* // NOTE: there is no point checking this because this route will not initiate unless there is nome sort of id 
        if(!id){ e
            throw new ApiError(400, "invalid application")
        }
        */
        

        // // if deleteOne is used then
        // const popApplication = await Data.deleteOne(
        //     {_id: id}
        // ) 
        // // then needs to be done like this because (deleteOne) always retuens something
        // if(popApplication.length === 0){
        //     throw new ApiError(400, "there was some error while deleting application")
        // }


        const popApplication = await Data.findByIdAndDelete(id)
        if(!popApplication){
            throw new ApiError(400, "there was some error while deleting application")
        }


        res
        .status(200)
        .json( new ApiResponce(
            200,
            popApplication,
            "application has been successfully deleted"
        ))
    }
)

// a saperate controller for status options
const statusListProvider = asyncHandler(
    async (req, res) => {
        // res
        // .status(200)
        // .json( // json only takes only output only one value so it has to be in object
        //     {
        //         status: APPLICATION_STATUS, 
        //         APIResponce: new ApiResponce(
        //             200,
        //             APPLICATION_STATUS,
        //             "here is your data"
        //         )  
        //     }
        // )

        res
        .status(200)
        .json(APPLICATION_STATUS) // not using API responce 
    }
)

const graphData = asyncHandler(
    async (req, res) => {
        const user = req.userData?._id
        if(!user){
            throw new ApiError(400, "cuould not find user")
        }

        const statusData = await Data.aggregate([
                
            {
                $match: {
                    user: user // or new mongoose.Types.ObjectId(user) if needed
                }
            },
            {

                $group:{
                    _id: "$status",
                    count: {$sum: 1}
                }
            }
                
        ])

        const LineData = await Data.aggregate([
            {
                $match: {
                    user: user // or new mongoose.Types.ObjectId(user) if needed
                }
            },
            {
                $group: {
                _id: {
                    date: {
                    $dateToString: {
                        format: "%Y-%m-%d",
                        date: "$createdAt",
                    },
                    },
                },
                applications: {
                    $sum: {
                    $cond: [{ $eq: ["$status", "Applied"] }, 1, 0],
                    },
                },
                interviews: {
                    $sum: {
                    $cond: [{ $eq: ["$status", "Interview"] }, 1, 0],
                    },
                },
                },
            },
            {
                $sort: {
                "_id.date": 1,
                },
            },
            {
                $project: {
                _id: 0,
                date: "$_id.date",
                applications: 1,
                interviews: 1,
                },
            },
        ]);

        if(
            [statusData, LineData].some((val) => !val)
        ){
            throw new ApiError(400, "somethingwent wrong while fetching required data")
        }

        // if(!statusData || !LineData){
        //     throw new ApiError(400, "something went wrong while fetching data")
        // }

        // res
        // .status(200)
        // .json( new ApiResponce(
        //     200,
        //     statusData,
        //     "status count recieved successfully"
        // ))
        res
        .status(200)
        .json({
            statusAndBarGraphData: statusData,
            lineGraphData: LineData
        }) // not uing apiResponse here as well


    }
)

const allData = asyncHandler(
    async (req, res) => {
        const user = req.userData?._id
        if(!user){
            throw new ApiError(400, "cuould not find user")
        }

        const allApplicationData = await Data.find({user: user})

        if(!allApplicationData){
            throw new ApiError(400, "something went wrong while fetching data")
        }

        res
        .status(200)
        .json(allApplicationData) // not uing apiResponse here as well
    }
)

export {
    addData,
    readAll,
    updateApplication,
    updateApplicationStatus,
    deleteApplication,
    statusListProvider,
    graphData,
    allData,
}