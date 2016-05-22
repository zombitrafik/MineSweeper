package com.kimreik.dialog;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QPrivateMessage is a Querydsl query type for PrivateMessage
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QPrivateMessage extends BeanPath<PrivateMessage> {

    private static final long serialVersionUID = 1226651219L;

    public static final QPrivateMessage privateMessage = new QPrivateMessage("privateMessage");

    public final StringPath message = createString("message");

    public final StringPath recipient = createString("recipient");

    public final StringPath sender = createString("sender");

    public QPrivateMessage(String variable) {
        super(PrivateMessage.class, forVariable(variable));
    }

    public QPrivateMessage(Path<? extends PrivateMessage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QPrivateMessage(PathMetadata<?> metadata) {
        super(PrivateMessage.class, metadata);
    }

}

