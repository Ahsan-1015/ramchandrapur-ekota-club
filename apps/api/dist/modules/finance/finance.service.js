"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const transaction_schema_1 = require("./schemas/transaction.schema");
let FinanceService = class FinanceService {
    constructor(transactionModel) {
        this.transactionModel = transactionModel;
    }
    async create(input, userId) {
        const txn = new this.transactionModel({
            ...input,
            performedBy: userId,
            transactionDate: new Date(input.transactionDate),
        });
        return txn.save();
    }
    async findAll() {
        return this.transactionModel
            .find()
            .sort({ transactionDate: -1 })
            .populate('performedBy', 'email role')
            .exec();
    }
    async getSummary() {
        const result = await this.transactionModel.aggregate([
            { $match: { isVerified: true } },
            {
                $group: {
                    _id: '$type',
                    totalAmount: { $sum: '$amount' },
                },
            },
        ]);
        let totalIncome = 0;
        let totalExpense = 0;
        result.forEach((item) => {
            if (item._id === 'INCOME')
                totalIncome = item.totalAmount;
            if (item._id === 'EXPENSE')
                totalExpense = item.totalAmount;
        });
        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
        };
    }
};
exports.FinanceService = FinanceService;
exports.FinanceService = FinanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(transaction_schema_1.Transaction.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FinanceService);
//# sourceMappingURL=finance.service.js.map