package andy.granttopo.db;

import andy.granttopo.model.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by andy on 12/29/14.
 */
@Repository
public class TestDao {
    @Autowired
    private HibernateTemplate hibernateTemplate;

    public void test(String name) {
        List<Node> nodeList = hibernateTemplate.loadAll(Node.class);
        for (Node node : nodeList) {
            System.out.println(node.getName());
        }

    }
}
