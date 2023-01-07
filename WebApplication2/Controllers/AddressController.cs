using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AddressController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public string GetAllAdress()
        {
            string datasource = _configuration.GetConnectionString("UserTable");
            string query = @"select * from Addresses";
            DataTable table = new DataTable();
            SqlDataReader reader;
            using(SqlConnection connection= new SqlConnection(datasource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    reader = command.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    connection.Close();
                }
                
            }
            return JsonConvert.SerializeObject(table);
        }
        [HttpGet]
        [Route("{UserId:int}")]
        public string GetAddress(int UserId)
        {
            string datasource = _configuration.GetConnectionString("UserTable");
            string query = @"select * from Addresses where UserId = @UserId";
            DataTable table = new DataTable();
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(datasource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@UserId", UserId);
                    reader = command.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    connection.Close();
                }

            }
            return JsonConvert.SerializeObject(table);
        }
        [HttpPost]
        public string AddAddress(Address address)
        {
            string datasource = _configuration.GetConnectionString("UserTable");
            string query = @"insert into addresses values(@HouseName,@Post,@city,@state,@pincode,@userId)";
            DataTable table = new DataTable();
            
            using (SqlConnection connection = new SqlConnection(datasource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@HouseName", address.HouseName);
                    command.Parameters.AddWithValue("@Post", address.Post);
                    command.Parameters.AddWithValue("@city", address.City);
                    command.Parameters.AddWithValue("@state", address.State);
                    command.Parameters.AddWithValue("@pincode", address.Pincode);
                    command.Parameters.AddWithValue("@userId", address.UserId);
                    command.ExecuteNonQuery();
                    
                    
                    connection.Close();
                }

            }
            return JsonConvert.SerializeObject(table);
        }
    }
}
