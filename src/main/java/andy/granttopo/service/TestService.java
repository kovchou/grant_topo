package andy.granttopo.service;

import andy.granttopo.db.TestDao;
import andy.granttopo.model.User.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by andy on 12/29/14.
 */
@Service
public class TestService {
    @Autowired
    private TestDao testDao;

    public void test(User user) {
        testDao.test(user.getUsername());
    }
}
