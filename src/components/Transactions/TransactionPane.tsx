import { useState, useCallback } from "react"
import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent, SetTransactionApprovalFunction } from "./types"
import { useTransactionApproval } from "src/hooks/useTransactionApproval"

export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval: consumerSetTransactionApproval,
}) => {
  const [approved, setApproved] = useState(transaction.approved)
  const { ...transactionUtils } = useTransactionApproval()

  const saveTransaction = useCallback<SetTransactionApprovalFunction>(
    async ({ transactionId, newValue }) => {
      await transactionUtils.setTransactionApproval(transactionId, newValue)
    },
    [transactionUtils]
  )

  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        checked={approved}
        disabled={loading}
        onChange={async (newValue) => {
          await consumerSetTransactionApproval({
            transactionId: transaction.id,
            newValue,
          })
          await saveTransaction({ transactionId: transaction.id, newValue })
          setApproved(newValue)
        }}
      />
    </div>
  )
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
