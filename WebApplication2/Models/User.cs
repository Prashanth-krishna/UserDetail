using System.ComponentModel.DataAnnotations;

namespace WebApplication2.Models
{
    public class User
    {
        public int UserId { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string UserEmail { get; set; }
        public string Phone { get; set; }
    }
}
