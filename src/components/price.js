import React from "react"
import PropTypes from "prop-types"

const RecurringLabel = ({ recurring }) => {
  const { interval, interval_count, trial_period_days } = recurring
  const label =
    interval_count !== 1 ? `${interval_count} ${interval}s` : interval
  const trial =
    trial_period_days > 0 ? `Try free for ${trial_period_days} days` : null
  return (
    <>
      {" "}
      / {label} {trial}
    </>
  )
}

const Price = ({ price }) => {
  return (
    <>
      &pound;{(price.unit_amount / 100).toFixed(2)}
      {price.type === "recurring" && (
        <RecurringLabel recurring={price.recurring} />
      )}
    </>
  )
}

RecurringLabel.propTypes = {
  interval: PropTypes.string.isRequired,
  interval_count: PropTypes.number.isRequired,
  trial_period_days: PropTypes.number
}

Price.propTypes = {
  price: PropTypes.shape({
    type: PropTypes.oneOf(["recurring", "one_time"]),
    unit_amount: PropTypes.number.isRequired
  })
}

export default Price
