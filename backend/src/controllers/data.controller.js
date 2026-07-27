import { asyncHandler } from "../utility/asyncHandler.js"
import { ApiError } from "../utility/ApiError.js"
import { Data } from "../models/data.model.js"
import { ApiResponce } from "../utility/ApiResponse.js"
import { APPLICATION_STATUS } from "../constants/statusOptions.js"

// create data controller

const addData = asyncHandler(
    async (req, res) => {
        const {companyName, role, location, salaryRange, companyLink, status} = req.body

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
        // fetch whatever data is in the 

        const allAplication = await Data.find()

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
            {new: true}
        )
        

        if(!updatedApplication){
            throw new ApiError(400, " could not finta this applicaion")
        }
        
        
        res
        .status(200)
        .json( new ApiResponce(
            200,
            updatedApplication,
            "got that fuker"
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

const sendStatusCount = asyncHandler(
    async (req, res) => {

        const statusData = await Data.aggregate(
            [
                {
                    $group:{
                        _id: "$status",
                        count: {$sum: 1}
                    }
                }
            ]
        )

        if(!statusData){
            throw new ApiError(400, "something went wrong while fetching data")
        }

        // res
        // .status(200)
        // .json( new ApiResponce(
        //     200,
        //     statusData,
        //     "status count recieved successfully"
        // ))
        res
        .status(200)
        .json(statusData) // not uing apiResponse here as well


    }
)

export {
    addData,
    readAll,
    updateApplication,
    deleteApplication,
    statusListProvider,
    sendStatusCount
}