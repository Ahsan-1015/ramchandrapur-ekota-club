'use client';

import React, { useEffect, useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  X 
} from 'lucide-react';

interface ITransactionItem {
  _id: string;
  type: 'INCOME' | 'EXPENSE';
  category: string;
  amount: number;
  title: string;
  description?: string;
  transactionDate: string;
  paymentMethod: string;
  referenceNo?: string;
  isVerified: boolean;
}

export default function FinanceDashboardPage() {
  const [summary, setSummary] = useState<{ totalIncome: number; totalExpense: number; balance: number } | null>(null);
  const [transactions, setTransactions] = useState<ITransactionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // New Transaction Form State
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    type: 'INCOME',
    category: 'MEMBERSHIP_FEE',
    amount: '',
    title: '',
    description: '',
    transactionDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'BKASH',
    referenceNo: '',
  });

  useEffect(() => {
    fetchFinanceData();
  }, []);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  async function fetchFinanceData() {
    setLoading(true);
    try {
      const [sumRes, txnRes] = await Promise.all([
        fetch('http://localhost:5000/api/v1/finance/summary', { credentials: 'include' }),
        fetch('http://localhost:5000/api/v1/finance/transactions', { credentials: 'include' }),
      ]);

      const sumData = await sumRes.json();
      const txnData = await txnRes.json();

      if (sumData.success) setSummary(sumData.data);
      if (txnData.success) setTransactions(txnData.data);
    } catch (err) {
      console.error('Failed to fetch finance data', err);
    } finally {
      setLoading(false);
    }
  }

  const handleCreateTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/v1/finance/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...form,
          amount: parseFloat(form.amount),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('success', `নতুন ভাউচার "${form.title}" সফলভাবে যুক্ত করা হয়েছে!`);
        setShowModal(false);
        setForm({
          type: 'INCOME',
          category: 'MEMBERSHIP_FEE',
          amount: '',
          title: '',
          description: '',
          transactionDate: new Date().toISOString().split('T')[0],
          paymentMethod: 'BKASH',
          referenceNo: '',
        });
        fetchFinanceData();
      } else {
        showToast('error', data.message || 'ভাউচার তৈরিতে সমস্যা হয়েছে');
      }
    } catch (err: any) {
      showToast('error', err.message || 'সার্ভার সংযোগ সমস্যা');
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-6 right-6 z-50 p-4 rounded-2xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
            toastMessage.type === 'success'
              ? 'bg-slate-900 border-emerald-500/50 text-emerald-400'
              : 'bg-slate-900 border-rose-500/50 text-rose-400'
          }`}
        >
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
          )}
          <span className="text-xs font-bold">{toastMessage.text}</span>
        </div>
      )}

      {/* Header & Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-cyan-400" /> ডিজিটাল আর্থিক হিসাব ও স্বচ্ছতা লেজার
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            রামচন্দ্রপুর একতা ক্লাবের ১০০% উন্মুক্ত ডিজিটাল রসিদ ও আয়-ব্যয় ভাউচার।
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 text-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" /> + নতুন ভাউচার যোগ করুন
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-emerald-400 uppercase tracking-wider">
            <span>মোট আয় (Total Income)</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-3xl font-bold text-slate-100">
            {loading || !summary ? '...' : `৳ ${summary.totalIncome.toLocaleString()}`}
          </div>
          <p className="text-xs text-slate-500">চাঁদা, অনুদান ও স্পন্সর ফান্ড</p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-rose-400 uppercase tracking-wider">
            <span>মোট ব্যয় (Total Expense)</span>
            <TrendingDown className="w-4 h-4" />
          </div>
          <div className="text-3xl font-bold text-slate-100">
            {loading || !summary ? '...' : `৳ ${summary.totalExpense.toLocaleString()}`}
          </div>
          <p className="text-xs text-slate-500">সামাজিক ত্রাণ ও পরিচালনা খরচ</p>
        </div>

        <div className="bg-slate-900/80 border border-emerald-500/30 bg-emerald-950/10 p-6 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-cyan-400 uppercase tracking-wider">
            <span>বর্তমান তহবিল (Current Fund)</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-bold text-emerald-400">
            {loading || !summary ? '...' : `৳ ${summary.balance.toLocaleString()}`}
          </div>
          <p className="text-xs text-slate-400">ব্যাংক ও ডিজিটাল রিযার্ভ</p>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-slate-100 text-base">আর্থিক লেনদেন রেজিস্টার (Transactions Log)</h3>
          <span className="text-xs text-slate-400">মোট লেনদেন: {transactions.length} টি</span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">লেনদেন ডাটা লোড হচ্ছে...</div>
        ) : transactions.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">কোনো লেনদেন পাওয়া যায়নি।</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-6">খাত ও শিরোনাম (Title)</th>
                  <th className="py-3.5 px-6">টাইপ (Type)</th>
                  <th className="py-3.5 px-6">পরিমাণ (Amount)</th>
                  <th className="py-3.5 px-6">পেমেন্ট মেথড (Method)</th>
                  <th className="py-3.5 px-6">তারিখ (Date)</th>
                  <th className="py-3.5 px-6">ভেরিফিকেশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {transactions.map((t) => (
                  <tr key={t._id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <span className="font-semibold text-slate-100 block">{t.title}</span>
                        {t.description && <span className="text-xs text-slate-400 block">{t.description}</span>}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${
                        t.type === 'INCOME' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold font-mono">
                      <span className={t.type === 'INCOME' ? 'text-emerald-400' : 'text-rose-400'}>
                        {t.type === 'INCOME' ? '+' : '-'} ৳ {t.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-300">
                      {t.paymentMethod} {t.referenceNo ? `(${t.referenceNo})` : ''}
                    </td>
                    <td className="py-4 px-6 text-xs text-slate-400">
                      {new Date(t.transactionDate).toLocaleDateString('bn-BD')}
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for adding new transaction */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex justify-center items-center p-4">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl w-full max-w-lg space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-100">নতুন আর্থিক ভাউচার যোগ করুন</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTransaction} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">লেনদেনের ধরন (Type)</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:outline-none"
                >
                  <option value="INCOME">আয় (Income)</option>
                  <option value="EXPENSE">ব্যয় (Expense)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">শিরোনাম (Title)</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="যেমন: সদস্য বার্ষিক চাঁদা"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">টাকার পরিমাণ (BDT)</label>
                <input
                  type="number"
                  required
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="5000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-slate-400 font-semibold block mb-1">পেমেন্ট মেথড (Payment Method)</label>
                <select
                  value={form.paymentMethod}
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100 focus:outline-none"
                >
                  <option value="BKASH">bKash (বিকাশ)</option>
                  <option value="NAGAD">Nagad (নগদ)</option>
                  <option value="BANK">Bank Transfer (ব্যাংক)</option>
                  <option value="CASH">Cash (নগদ ক্যাশ)</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-xl text-xs"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-xl text-xs shadow-lg shadow-emerald-500/20"
                >
                  ভাউচার যুক্ত করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
