package andy.granttopo.model.User;

/**
 * Created by andy on 12/28/14.
 */
public class User {
    private String username;
    private String password;

    public User(String name) {
        this.username = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
