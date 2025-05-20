
using System.ComponentModel.DataAnnotations;

namespace ExpenseTrackerAPI.Models
{
    public class Transaction
    {
        [Key]
        public int Id { get; set; }
        public int Year { get; set; }
        public string Month { get; set; }
        public int Date { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; }
    }
}
