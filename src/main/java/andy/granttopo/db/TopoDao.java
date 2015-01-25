package andy.granttopo.db;

import andy.granttopo.model.Link;
import andy.granttopo.model.Node;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate4.HibernateTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by andy on 1/2/15.
 */
@Repository
public class TopoDao {
    @Autowired
    private HibernateTemplate hibernateTemplate;

    public List<Node> getAllNodes() {
        return hibernateTemplate.loadAll(Node.class);
    }
    public List<Link> getAllLinks() {
        return hibernateTemplate.loadAll(Link.class);
    }
}
