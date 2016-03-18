package com.kimreik.dialog;

import com.mysema.query.types.Path;
import com.mysema.query.types.PathMetadata;
import com.mysema.query.types.path.BeanPath;
import com.mysema.query.types.path.StringPath;

import javax.annotation.Generated;

import static com.mysema.query.types.PathMetadataFactory.forVariable;

/**
 * QPrivateMessage is a Querydsl query type for PrivateMessage
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QPrivateMessage extends BeanPath<PrivateMessage>
{

	public static final QPrivateMessage	privateMessage		= new QPrivateMessage("privateMessage");
	private static final long			serialVersionUID	= 1226651219L;
	public final StringPath				message				= createString("message");

	public final StringPath				recipient			= createString("recipient");

	public final StringPath				sender				= createString("sender");

	public QPrivateMessage(String variable)
	{
		super(PrivateMessage.class, forVariable(variable));
	}

	public QPrivateMessage(Path<? extends PrivateMessage> path)
	{
		super(path.getType(), path.getMetadata());
	}

	public QPrivateMessage(PathMetadata<?> metadata)
	{
		super(PrivateMessage.class, metadata);
	}

}
