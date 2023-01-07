using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Text.Json;
using WebApplication2.Models;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace WebApplication2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public string GetAllUsers()
        {
            string query = @"select * from Users";
            string datasource = _configuration.GetConnectionString("UserTable");
            DataTable table   = new DataTable();
            SqlDataReader reader;
            using (SqlConnection connection = new SqlConnection(datasource))
            {
                connection.Open();
                using(SqlCommand command = new SqlCommand(query, connection))
                {
                    reader= command.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    connection.Close();
                }
            }
            return JsonConvert.SerializeObject(table);
            
            
            
        }
        [HttpPost]
        public string AddUsers(User user)
        {
            string query = @"exec spAddUser @UserName,@UserEmail,@UserPhone ";
            string datasource = _configuration.GetConnectionString("UserTable");
            DataTable table = new DataTable();
            decimal Id;
            using (SqlConnection connection = new SqlConnection(datasource))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("spAddUser", connection))
                {
                    command.Parameters.AddWithValue("@UserName", user.UserName);
                    command.Parameters.AddWithValue("@UserEmail", user.UserEmail);
                    command.Parameters.AddWithValue("@Phone", user.Phone);
                    command.CommandType = CommandType.StoredProcedure;
                    Id =(decimal)command.ExecuteScalar();
                    
                    
                    
                    connection.Close();
                }
            }
            return JsonConvert.SerializeObject(Id);



        }
    }
}
