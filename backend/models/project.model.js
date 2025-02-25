const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ['Pending', 'In Progress', 'Completed'],
            default:"In Progress"
        },

        assignedTo: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'admin',
              required: true
            }
          ],
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
          },
          progress:{
            type:Number,
            default:20
          }

        // startDate: {
        //     type: Date,
        //     required: [true]
        // },

        // endDate: {
        //     type: Date,
        //     required: [true]
        // },

        // createdBy: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Admin'    ,
        //     required: [true],
        //     default: null
        // },
    }, { timestamps: true,}
);
   
const Project = mongoose.model('project', projectSchema);
module.exports = Project;