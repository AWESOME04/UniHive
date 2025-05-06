/**
 * Formats a number as Ghanaian Cedis (GH₵)
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number | string,
  options: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    useSymbol?: boolean;
  } = {}
): string => {
  const {
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    useSymbol = true,
  } = options;

  // Convert string to number if needed
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  // Handle NaN
  if (isNaN(numericAmount)) {
    return useSymbol ? 'GH₵0' : '0';
  }

  // Format the number using the Ghana locale
  const formattedAmount = numericAmount.toLocaleString('en-GH', {
    minimumFractionDigits,
    maximumFractionDigits,
  });

  return useSymbol ? `GH₵${formattedAmount}` : formattedAmount;
};

/**
 * Formats a range of currency values
 * @param min - Minimum amount
 * @param max - Maximum amount
 * @returns Formatted currency range string
 */
export const formatCurrencyRange = (min: number | string, max: number | string): string => {
  return `${formatCurrency(min)} - ${formatCurrency(max)}`;
};
