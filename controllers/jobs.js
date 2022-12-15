const JobModel = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')
const notFound = require('../middleware/not-found')

const getAllJobs = async (req, res) => {

    const jobs = await JobModel.find({createdBy: req.user.userId}).sort('createAt')
    res.status(StatusCodes.OK).json({jobs, count: jobs.length})
}

const getJob= async (req, res) => {
    const {id: jobId} = req.params
    const {userId: userId } = req.user

    const singleJob = await JobModel.findOne({ createdBy: userId, _id: jobId })
    // const singleJob = await JobModel.findOne({ _id: jobId })

    if (!singleJob){
        throw new NotFoundError(`no jobs with the id ${jobId} found!`)
    }
    res.status(StatusCodes.OK).json({singleJob})
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await JobModel.create(req.body)

    res.status(StatusCodes.CREATED).json({job})
}

const updateJob= async (req, res) => {
    res.send('update a job')
}

const deleteJob= async (req, res) => {
    res.send('delete a job')
}




module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob}