using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ExpenseTrackerAPI.Data;
using ExpenseTrackerAPI.Models;

namespace ExpenseTrackerAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly ExpenseDbContext _context;

        public TransactionsController(ExpenseDbContext context)
        {
            _context = context;
        }

        // CREATE
        [HttpPost]
        public async Task<IActionResult> CreateTransaction(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return Ok(transaction);
        }

        // READ ALL
        [HttpGet]
        public async Task<IActionResult> GetAllTransactions()
        {
            var transactions = await _context.Transactions.ToListAsync();
            return Ok(transactions);
        }

        // READ BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTransactionById(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
                return NotFound();

            return Ok(transaction);
        }

        // UPDATE
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTransaction(int id, Transaction updatedTransaction)
        {
            if (id != updatedTransaction.Id)
                return BadRequest("Transaction ID mismatch.");

            var existingTransaction = await _context.Transactions.FindAsync(id);
            if (existingTransaction == null)
                return NotFound();

            existingTransaction.Year = updatedTransaction.Year;
            existingTransaction.Month = updatedTransaction.Month;
            existingTransaction.Date = updatedTransaction.Date;
            existingTransaction.Description = updatedTransaction.Description;
            existingTransaction.Amount = updatedTransaction.Amount;
            existingTransaction.Type = updatedTransaction.Type;

            await _context.SaveChangesAsync();
            return Ok(existingTransaction);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);

            if (transaction == null)
            {
                return NotFound();
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

           
            return Ok(new { message = "Transaction deleted successfully." });
        }
    }
}
