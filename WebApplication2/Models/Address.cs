using System.Security.Authentication;

namespace WebApplication2.Models
{
    public class Address
    {
        public int AddressId { get; set; }
        public string HouseName { get; set; }
        public string Post { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Pincode { get; set; }
        public int UserId { get; set; }
    }
}
