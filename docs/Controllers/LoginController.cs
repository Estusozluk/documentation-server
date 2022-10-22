using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace docs.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {

        MySqlConnection _connection;

        public LoginController(MySqlConnection connection)
        {
            this._connection = connection;
        }

        [HttpPost]
        public async Task<object> IsUserExists([FromBody] User user)
        {
            await _connection.OpenAsync();

            string query = string.Format("SELECT COUNT(*) FROM users WHERE username='{0}' AND password='{1}';", user.username, user.password);

            using var command = new MySqlCommand(query, _connection);
            using var reader = await command.ExecuteReaderAsync();
            while (await reader.ReadAsync())
            {
                var userExists = (Int64)reader.GetValue(0) == 0 ? false : true;
                return Ok(new { userExists = userExists });
            }
            return NotFound();
        }
    }
}
